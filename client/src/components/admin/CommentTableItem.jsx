import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {

  if (!comment || !comment.blog) return null;

  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const BlogData = new Date(createdAt);

  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post(
        "/api/admin/approve-comment",
        { id: _id }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirm) return;

    try {
      const { data } = await axios.post(
        "/api/admin/delete-comment",
        { id: _id }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4 max-w-xl">
        <p>
          <b className="font-medium text-gray-600">Blog</b> :{" "}
          <span className="wrap-break-word">{blog?.title || "No Blog"}</span>
        </p>

        <p className="mt-4">
          <b className="font-medium text-gray-600">Name</b> :{" "}
          <span className="wrap-break-word">{name}</span>
        </p>

        <p className="mt-4">
          <b className="font-medium text-gray-600">Comment</b> :
        </p>
        <p className="mt-2 wrap-break-word  whitespace-pre-wrap leading-relaxed">
          {content}
        </p>
      </td>

      <td className="px-6 py-4 max-sm:hidden whitespace-nowrap">
        {BlogData.toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt=""
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt=""
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
