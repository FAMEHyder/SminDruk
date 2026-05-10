"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";

import CreatePostModal from "../Post_Model/page.jsx";

const POST_TYPES = { PHOTO: 0, REEL: 1, STORY: 2, SCHEDULE: 3 };
const TIMES = ["08:41 PM", "09:41 PM", "10:51 PM"];

const Scheduler = () => {
  const [pages, setPages] = useState([]);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [postType, setPostType] = useState(POST_TYPES.PHOTO);

  const [fromPage, setFromPage] = useState("");
  const [toPage, setToPage] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState([]);
  const [failedPages, setFailedPages] = useState([]);

  const [scheduleSlots, setScheduleSlots] = useState([]);
  const [lastDate, setLastDate] = useState(new Date());

  const [openModal, setOpenModal] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  const scheduleRef = useRef(null);

  // ================= MEDIA VALIDATION =================
  useEffect(() => {
    if (!media) return;

    if (postType === POST_TYPES.PHOTO && !media.type.startsWith("image")) {
      alert("Image required for photo post");
      setMedia(null);
    }

    if (
      (postType === POST_TYPES.REEL || postType === POST_TYPES.STORY) &&
      !media.type.startsWith("video")
    ) {
      alert("Video required for reel/story");
      setMedia(null);
    }
  }, [media, postType]);

  // ================= SCHEDULER =================
  const generateNextDays = (days = 3) => {
    const newSlots = [];
    let date = new Date(lastDate);

    for (let i = 0; i < days; i++) {
      date.setDate(date.getDate() + 1);

      TIMES.forEach((time) => {
        newSlots.push({
          id: `${date.toDateString()}-${time}`,
          date: date.toDateString(),
          time,
        });
      });
    }

    setLastDate(new Date(date));
    setScheduleSlots((prev) => [...prev, ...newSlots]);
  };

  useEffect(() => {
    if (postType !== POST_TYPES.SCHEDULE) return;

    setScheduleSlots([]);
    setLastDate(new Date());
    generateNextDays(4);
  }, [postType]);

  const handleScheduleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      generateNextDays(2);
    }
  };

  // ================= MAIN POST =================
  const handlePost = async () => {
    if (!fromPage || !toPage) return alert("Enter Page Range");
    if (!secretKey) return alert("Secret Key required");

    if (
      (postType === POST_TYPES.REEL || postType === POST_TYPES.STORY) &&
      !media
    ) {
      return alert("Video file required for Reel/Story");
    }

    try {
      setLoading(true);
      setProgress({ current: 0, total: 0 });
      setResults([]);
      setFailedPages([]);

      const fd = new FormData();
      fd.append("content", content);
      fd.append("fromPage", fromPage);
      fd.append("toPage", toPage);
      fd.append("secretKey", secretKey);

      // 🔥 FIX: SEND postType
      fd.append(
        "postType",
        postType === POST_TYPES.PHOTO
          ? "photo"
          : postType === POST_TYPES.REEL
          ? "reel"
          : postType === POST_TYPES.STORY
          ? "story"
          : "text"
      );

      if (media) fd.append("media", media);

      const res = await fetch(
        "http://localhost:8000/api/postByPageNumber/post-photo",
        {
          method: "POST",
          body: fd,
        }
      );

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let successCount = 0;
      let failCount = 0;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line) continue;

          const data = JSON.parse(line);

          setProgress({
            current: data.progress,
            total: data.total,
          });

          setResults((prev) => [...prev, data.data]);

          if (data.data.success) {
            successCount++;
          } else {
            failCount++;
            setFailedPages((prev) => [...prev, data.data]);
          }
        }
      }

      setLoading(false);

      // 🔥 FINAL ALERTS
      if (successCount > 0 && failCount === 0) {
        alert(`✅ All posts successful (${successCount})`);
      } else if (successCount > 0 && failCount > 0) {
        alert(
          `⚠️ Partial success\n✅ ${successCount} success\n❌ ${failCount} failed`
        );
      } else {
        alert(`❌ All posts failed (${failCount})`);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Posting failed ❌");
    }
  };

  // ================= RETRY FAILED =================
  const retryFailedPosts = async () => {
    if (!failedPages.length) return alert("No failed posts");

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8000/api/postByPageNumber/retry-failed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pages: failedPages,
            content,
            secretKey,
          }),
        }
      );

      const data = await res.json();

      setLoading(false);

      if (data.success) {
        alert("✅ Retry completed successfully");
        setFailedPages([]);
      } else {
        alert("⚠️ Retry completed with issues");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Retry failed ❌");
    }
  };

  return (
    <Grid container sx={{ height: "86vh", width: "99%", mt: 1 }}>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            zIndex: 9999,
          }}
        >
          🚀 Posting in progress...
          <Typography sx={{ mt: 1 }}>
            {progress.current}/{progress.total}
          </Typography>
        </Box>
      )}

      <Grid item xs={12} md={9} sx={{ p: 3, boxShadow: "2px 2px 2px 2px black" ,width:"100%"}}>
        <Typography variant="h5" fontWeight={700}>
          Scheduler
        </Typography>

        <Tabs value={postType} onChange={(e, v) => setPostType(v)}>
          <Tab label="Photo" />
          <Tab label="Reel" />
          <Tab label="Story" />
          <Tab label="Schedule" />
        </Tabs>

        {postType !== POST_TYPES.SCHEDULE && (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mt: 2 }}
            />

            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files[0])}
            />

            <Box display="flex" gap={2} mt={2}>
              <TextField
                label="From Page"
                type="number"
                value={fromPage}
                onChange={(e) => setFromPage(e.target.value)}
              />
              <TextField
                label="To Page"
                type="number"
                value={toPage}
                onChange={(e) => setToPage(e.target.value)}
              />
            </Box>

            <TextField
              fullWidth
              label="Secret Key"
              sx={{ mt: 2 }}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handlePost}
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Now"}
            </Button>

            <Box mt={2}>
              <Typography>
                Progress: {progress.current}/{progress.total}
              </Typography>
            </Box>

            {failedPages.length > 0 && (
              <Button
                fullWidth
                color="error"
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={retryFailedPosts}
              >
                Retry Failed ({failedPages.length})
              </Button>
            )}
          </>
        )}

        {postType === POST_TYPES.SCHEDULE && (
          <Box
            ref={scheduleRef}
            onScroll={handleScheduleScroll}
            sx={{ height: "70vh", overflowY: "auto" }}
          >
            {scheduleSlots.map((slot) => (
              <Box key={slot.id} sx={{ mb: 2 }}>
                <Typography fontWeight={600}>{slot.date}</Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setActiveSlot(slot);
                    setOpenModal(true);
                  }}
                >
                  + New ({slot.time})
                </Button>

                {openModal && (
                  <CreatePostModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    slot={activeSlot}
                    pages={pages}
                  />
                )}
              </Box>
            ))}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Scheduler;