import styles from "./registration-page.module.scss";
import uploadImageLogo from "../../assets/uploadImageLogo.svg";
import {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import User from "../../utilities/models/user";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [userImage, setUserImage] = useState<string | undefined>(undefined);
  const userImageRef = useRef<HTMLImageElement | null>(null);
  const userImageInputRef = useRef<HTMLInputElement | null>(null);

  const [userName, setUserName] = useState<string>("");
  const userNameRef = useRef<HTMLInputElement | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files || !e.target.files[0]) return;
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
    if (!userImage) {
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

    const user = new User();
    user.createUser(userName, userImage!);

    navigate("/Auth/TaskPage");
  }

  function shakeIt(Ref: MutableRefObject<any>): void {
    Ref.current?.classList.add("shake");
    setTimeout(() => Ref.current?.classList.remove("shake"), 600);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Enter") buttonRef.current?.click();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="pageContainer">
      <div className={styles.regContainer}>
        {/* form თაგში სპეციალურად არ ვსვამ(ტრივიალური იქნება, 
                მაგრამ არ ვარ დარწმუნებული Best Practice_ია თუ არა) */}
        <h1>Get Started</h1>

        <div>
          <label htmlFor="userImage" className={styles.imageLabel}>
            <p>add a photo</p>
            <div className={styles.imageContainer} ref={userImageRef}>
              {userImage ? (
                <img
                  src={userImage}
                  alt="userImage"
                  className={styles.userImage}
                />
              ) : (
                <img
                  src={uploadImageLogo}
                  alt="uploadImageLogo"
                  className={styles.uploadImageLogo}
                />
              )}
            </div>
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
        </div>

        <div>
          <label htmlFor="userName">fill in your name</label>
          <input
            type="text"
            className={styles.userName}
            placeholder="your name"
            value={userName}
            onChange={handleUserNameChange}
            ref={userNameRef}
            required
          />
        </div>

        <button
          className={styles.signInButton}
          onClick={handleSignIn}
          ref={buttonRef}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
