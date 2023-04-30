import styles from "./registration-page.module.scss";
import uploadImageLogo from "../../assets/uploadImageLogo.svg";
import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../utilities/auth";

export interface User {
  name: string;
  imageBlob: string;
}

export default function RegistrationPage() {
  const [userImage, setUserImage] = useState<string>(uploadImageLogo);
  const userImageRef = useRef<HTMLImageElement | null>(null);
  const userImageInputRef = useRef<HTMLInputElement | null>(null);

  const [userName, setUserName] = useState<string>("");
  const userNameRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) return;
    const imageObject = e.target.files[0];

    // რეგულარული გამოსახულებით ვამოწმებ ატვირთული ფაილი ფოტოს ტიპისაა თუ არა.
    const regExp = /image\/.*/;
    if (!regExp.test(imageObject.type)) {
      shakeIt(userImageRef);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageObject);
    reader.onload = () => {
      const userImageDataURL = reader.result;
      if (typeof userImageDataURL != "string") {
        shakeIt(userImageRef);
        return false; // მთლიანად ტოვებს handleImageChange ფუნქციას და არა მარტო onload_ს
      }
      setUserImage(userImageDataURL);
    };
  }

  function handleUserNameChange(e: ChangeEvent<HTMLInputElement>): void {
    setUserName(e.target.value);
  }

  function validateInput(): boolean {
    let isValid = true;
    if (userImage == uploadImageLogo) {
      shakeIt(userImageRef);
      isValid = false;
    }
    if (userName == "") {
      shakeIt(userNameRef);
      isValid = false;
    }
    return isValid;
  }

  function handleSignIn(): void {
    if (!validateInput()) return;

    const user: User = { name: userName, imageBlob: userImage };
    const userJSON = JSON.stringify(user);
    localStorage.setItem("currentUser", userJSON);

    navigate("/Auth/TaskPage");
  }

  function shakeIt(Ref: MutableRefObject<any>): void {
    Ref.current?.classList.add("shake");
    setTimeout(() => Ref.current?.classList.remove("shake"), 600);
  }

  return (
    <div className="pageContainer">
      <div className={styles.regContainer}>
        <h1>Get Started</h1>

        {/* form თაგში სპეციალურად არ ვსვამ(ტრივიალური იქნება, 
                მაგრამ არ ვარ დარწმუნებული Best Practice_ია თუ არა) */}
        <label htmlFor="userImage">
          add a photo
          <br />
          <img
            src={userImage}
            alt="uploadImageLogo"
            className={styles.uploadImageLogo}
            style={
              userImage != uploadImageLogo
                ? { overflow: "hidden", padding: 0, width: "120px" }
                : undefined
            }
            ref={userImageRef}
          />
          <br />
        </label>
        <input
          type="file"
          id="userImage"
          className={styles.userImage}
          accept="image/*"
          hidden
          required
          ref={userImageInputRef}
          onChange={handleImageChange}
        />
        <br />

        <label htmlFor="userName">fill in your name</label>
        <br />
        <input
          type="text"
          className={styles.userName}
          placeholder="your name"
          value={userName}
          onChange={handleUserNameChange}
          ref={userNameRef}
          required
        />
        <br />

        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}
