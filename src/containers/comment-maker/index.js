import useSelector from "../../hooks/use-selector";
import Comment from "../../components/comment";

function CommentMaker({ comments }) {
  const select = useSelector((state) => ({
    session: state.session.exists,
  }));
  console.log(comments);
  return (
    <div>
      <h2 style={{ marginLeft: "30px" }}>Комментарии (0)</h2>
      {!select.session ? (
        <p style={{ padding: "30px" }}>
          Войдите, чтобы иметь возможность комментировать
        </p>
      ) : (
        <Comment />
      )}
    </div>
  );
}

export default CommentMaker;
