"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Typography, List, ListItem, ListItemText, TextField, FormControl, InputLabel, OutlinedInput, Select, MenuItem, Button, Grid, Tabs, Tab, Avatar,} from "@mui/material";

import CreatePostModal from "../Post_Model/page.jsx";
import { useAuthStore } from "../../StateManagment/Zustand.jsx";

const POST_TYPES = { PHOTO: 0, REEL: 1, STORY: 2, SCHEDULE: 3 };
const TIMES = ["08:41 PM", "09:41 PM", "10:51 PM"];

export default function Scheduler() {
  const { user } = useAuthStore();
  const userId = user?._id;

  const [isMounted, setIsMounted] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [postType, setPostType] = useState(POST_TYPES.PHOTO);

  const [openModal, setOpenModal] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  const [scheduleSlots, setScheduleSlots] = useState([]);
  const [lastDate, setLastDate] = useState(new Date());

  const scheduleRef = useRef(null);

  // ================= MOUNT =================
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ================= FETCH PAGES =================
  useEffect(() => {
    if (!isMounted || !userId) return;

    axios
      .get(
        `https://sat-tara-backend.vercel.app/api/pages/facebook/getPagesbyuserId/${userId}`
      )
      .then((res) => setPages(res.data.pages || []))
      .catch((err) => console.log(err));
  }, [isMounted, userId]);

  // ================= MEDIA VALIDATION =================
  useEffect(() => {
    if (!media) return;

    if (postType === POST_TYPES.PHOTO && !media.type.startsWith("image")) {
      alert("Post Photo = IMAGE required");
      setMedia(null);
    }

    if (
      (postType === POST_TYPES.REEL || postType === POST_TYPES.STORY) &&
      !media.type.startsWith("video")
    ) {
      alert("Reel / Story = VIDEO required");
      setMedia(null);
    }
  }, [media, postType]);

  // ================= SCHEDULE =================
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

  const handleSelectPages = (value) => {
    if (value.includes("ALL")) {
      setSelectedPages(pages.map((p) => p.pageId));
    } else {
      setSelectedPages(value);
    }
  };

  const handlePost = async () => {
    if (!userId) return alert("Login first");
    if (!selectedPages.length) return alert("Select page");

    const fd = new FormData();
    fd.append("caption", content);
    fd.append("pages", JSON.stringify(selectedPages));
    if (media) fd.append("media", media);

    try {
      if (postType === POST_TYPES.PHOTO) {
        await axios.post(
          "https://sat-tara-backend.vercel.app/api/pages/directFacebook/post-photo",
          fd
        );
      }

      if (postType === POST_TYPES.REEL || postType === POST_TYPES.STORY) {
        fd.append("type", postType === 1 ? "reel" : "story");

        await axios.post(
          "https://sat-tara-backend.vercel.app/api/pages/facebook/post-video",
          fd
        );
      }

      alert("Posted successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Post failed ❌");
    }
  };

  if (!isMounted) return null;

  if (!userId) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6">Please login first 😐</Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        mt: 6,
        overflow: "hidden",
      }}
    >
      {/* SIDEBAR */}
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          borderRight: "1px solid #4e4949",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Channels</Typography>

          <List>
            {pages.map((p) => (
              <ListItem key={p.pageId}>
                <Avatar src={p.profilePicture || ""} sx={{ mr: 1 }}>
                  {!p.profilePicture && p.pageName?.[0]}
                </Avatar>
                <ListItemText primary={p.pageName} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>

      {/* MAIN */}
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          p: 3,
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Schedule a Post
        </Typography>

        <Tabs
          value={postType}
          onChange={(e, v) => setPostType(v)}
          sx={{ mb: 2 }}
        >
          <Tab label="Photo" />
          <Tab label="Reel" />
          <Tab label="Story" />
          <Tab label="Schedule" />
        </Tabs>

        {postType === POST_TYPES.SCHEDULE ? (
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
        ) : (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Write post"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 2 }}
            />

            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files[0])}
            />

            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel>Select Pages</InputLabel>
              <Select
                multiple
                value={selectedPages}
                onChange={(e) => handleSelectPages(e.target.value)}
                input={<OutlinedInput label="Select Pages" />}
              >
                <MenuItem value="ALL">Select All</MenuItem>
                {pages.map((p) => (
                  <MenuItem key={p.pageId} value={p.pageId}>
                    {p.pageName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button fullWidth variant="contained" onClick={handlePost}>
              Post Now
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}