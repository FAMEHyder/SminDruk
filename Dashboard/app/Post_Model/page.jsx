"use client";

import { Dialog, Box, Typography, TextField, Button, Tabs, Tab, IconButton, Divider,} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import TagIcon from "@mui/icons-material/Tag";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";

const CreatePostModal = ({ open, onClose, pages }) => {
  const [type, setType] = useState(0);
  const [text, setText] = useState("");
  // const [media, setMedia] = useState(null);
  const [hashtags, setHashtags] = useState("");
  const [firstComment, setFirstComment] = useState("");
  const [scheduleAt, setScheduleAt] = useState(dayjs());
  const [media, setMedia] = useState([]);


  const handleSchedule = async () => {
    try {
      const fd = new FormData();

      fd.append("text", text);
      fd.append(
        "type",
        type === 0 ? "post" : type === 1 ? "reel" : "story"
      );
      fd.append("hashtags", hashtags);
      fd.append("firstComment", firstComment);
      fd.append("scheduledAt", scheduleAt.toISOString());
      fd.append(
        "pages",
        JSON.stringify(pages.map(p => p.pageId))
      );

      media.forEach(file => {
        fd.append("media", file);
      });

      await axios.post(
        "https://sat-tara-backend.vercel.app/api/pages/facebook/schedule",
        fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      );

      alert("Scheduled Successfully ✅");
      onClose();
    } catch (err) {
      console.error("Schedule Error:", err);
      alert("Failed to schedule post ❌");
    }
  };



  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <Box sx={{ display: "flex", height: "80vh" }}>
        {/* LEFT */}
        <Box sx={{ flex: 2, p: 3 }}>
          <Typography fontWeight={600}>Create Post</Typography>

          <Tabs value={type} onChange={(e, v) => setType(v)} sx={{ mb: 2 }}>
            <Tab label="Post" />
            <Tab label="Reel" />
            <Tab label="Story" />
          </Tabs>

          <TextField
            placeholder="What would you like to share?"
            multiline
            rows={5}
            fullWidth
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <Box sx={{ mt: 2 }}>
           
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={e => setMedia([...e.target.files])}
            />

          </Box>

          <Box sx={{ mt: 2 }}>
            <IconButton><EmojiEmotionsIcon /></IconButton>
            <IconButton><TagIcon /></IconButton>
          </Box>

          <TextField
            label="Hashtags"
            fullWidth
            sx={{ mt: 2 }}
            value={hashtags}
            onChange={e => setHashtags(e.target.value)}
          />

          <TextField
            label="First Comment"
            fullWidth
            sx={{ mt: 2 }}
            value={firstComment}
            onChange={e => setFirstComment(e.target.value)}
          />
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            borderLeft: "1px solid #ddd",
            bgcolor: "#fafafa",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography fontWeight={600}>Facebook Preview</Typography>

          <Box sx={{ mt: 2, p: 2, bgcolor: "#fff", borderRadius: 2 }}>
            <Typography fontWeight={500}>Page Name</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {text || "See your post's preview here"}
            </Typography>

            {media && media.length > 0 && media.map((file, index) => (
              file.type.startsWith("image") ? (
                <img key={index} src={URL.createObjectURL(file)} alt="" width="100%" style={{ marginTop: 8, borderRadius: 8 }} />
              ) : file.type.startsWith("video") ? (
                <video key={index} controls width="100%" style={{ marginTop: 8, borderRadius: 8 }}>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                </video>
              ) : null
            ))}

          </Box>

          <Divider sx={{ my: 2 }} />

          {/* CALENDAR + ACTION */}
          <Box sx={{ mt: "auto" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={scheduleAt}
                onChange={newValue => setScheduleAt(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ mb: 1 }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <CalendarMonthIcon sx={{ mr: 1 }} />,
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <Button
              variant="contained"
              fullWidth
              onClick={handleSchedule}
            >
              Schedule Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreatePostModal;
