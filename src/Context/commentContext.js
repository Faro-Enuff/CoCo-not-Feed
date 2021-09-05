import { createContext, useContext, useState } from "react";
import { AuthContext } from "./authContext";
import firebase from "firebase/app";
import { db } from "../firebase.js";
import { useHistory } from "react-router-dom";

export const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
  let history = useHistory();
  const { user } = useContext(AuthContext);
  const [commentCollection, setCommentCollection] = useState(null);

  const writeNewComment = (recipeId, recipeTitle, commentText) => {
    if (user) {
      console.log(recipeId);
      const commentsRef = db.collection("recipes").doc(recipeId.toString());
      console.log(commentsRef);
      commentsRef
        .set(
          {
            title: recipeTitle,
            comments: firebase.firestore.FieldValue.arrayUnion({
              title: recipeTitle,
              name: user.displayName,
              text: commentText,
              timestamp: new Date().toString(),
              avatar: "",
            }),
          },
          { merge: true }
        )
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      history.push("/signin");
    }
  };

  const allocateComments = (recipeId) => {
    db.collection("recipes")
      .doc(recipeId.toString())
      .onSnapshot((doc) => {
        console.log("Current data: ", doc?.data());
        setCommentCollection(doc.data()?.comments);
      });
  };

  return (
    <CommentContext.Provider
      value={{ writeNewComment, allocateComments, commentCollection }}
    >
      {children}
    </CommentContext.Provider>
  );
};
