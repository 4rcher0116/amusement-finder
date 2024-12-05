import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Container,
  Stack,
  Rating,
} from "@mui/material";
import { Review, ReviewRequest } from "../../models/dtos";
import { getReviewsByUser, updateReview } from "../../app/parkAPI";

const MyReviews: React.FC = () => {
  const userId = localStorage.getItem("userid");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!userId) return;
        const reviews = await getReviewsByUser(userId);
        setReviews(reviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  const handleEditClick = (review: Review) => {
    setEditReview(review);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleEditSave = async () => {
    if (editReview && editRating !== null) {
      const updatedReview: ReviewRequest = {
        id: editReview.id,
        review: editComment,
        userId: editReview.userId,
        ratingScore: editRating,
        themeParkId: editReview.themeParkId || "",
        themeParkLocationId: editReview.themeParkLocationId,
      };

      try {
        await updateReview(updatedReview);
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === editReview.id
              ? { ...review, comment: editComment, rating: editRating }
              : review
          )
        );
        setEditReview(null);
      } catch (error) {
        console.error("Failed to update review:", error);
      }
    }
  };

  const handleEditCancel = () => {
    setEditReview(null);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box padding={4}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ mb: 4, fontWeight: 600, color: 'primary.main' }}
        >
          My Reviews
        </Typography>
        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                  <Rating value={review.rating} readOnly size="small" />
                </Stack>
                <Typography variant="body1" gutterBottom>
                  {review.comment}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(review)}
                >
                  Edit
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Dialog open={!!editReview} onClose={handleEditCancel}>
          <DialogTitle>Edit Review</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Rating
                value={editRating}
                onChange={(_, newValue) => setEditRating(newValue || 0)}
                size="large"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Comment"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                multiline
                rows={4}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default MyReviews;