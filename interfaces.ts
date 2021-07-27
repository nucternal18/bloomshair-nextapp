/**
 * All Interfaces!!
 */

type ReviewProps = {
  rating: number;
  comment: string;
};
export interface IProduct {
  createProductReview: (productId: string, review: ReviewProps) => void;
  requestStatus: string;
  message: string;
  success: boolean;
  loading: boolean;
  error: string | Error | null;
}
