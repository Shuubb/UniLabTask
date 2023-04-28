import "./registration-page.scss";
import uploadImageLogo from "../../assets/uploadImageLogo.svg";
import { ChangeEvent, MutableRefObject, useRef, useState } from "react";

export default function WelcomePage() {
  const [userImage, setUserImage] = useState<string>(uploadImageLogo);
  const userImageRef = useRef<HTMLImageElement | null>(null);
  const userImageInputRef = useRef<HTMLInputElement | null>(null);

  const userNameRef = useRef<HTMLInputElement | null>(null);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) return;
    const imageObject = e.target.files[0];

    // რეგულარული გამოსახულებით ვამოწმებ ატვირთული ფაილი ფოტოს ტიპისაა თუ არა.
    const regExp = /image\/.*/;
    if (!regExp.test(imageObject.type)) {
      shakeIt(userImageRef);
      return;
    }

    const imageObjURL = URL.createObjectURL(imageObject);
    setUserImage(imageObjURL);
  }

  function handleSignIn(): void {
    let userImg = userImageInputRef.current?.files?.item(0);
    let userName = userNameRef.current?.value;

    if (!userImg) shakeIt(userImageRef);
    if (!userName) shakeIt(userNameRef);
    if (!userImg || !userName) return;

    const reader = new FileReader();
    reader.readAsDataURL(userImg);
    reader.onload = () => {
      if (typeof reader.result == "string")
        localStorage.setItem("userImage", reader.result);
    };
    localStorage.setItem("name", userName);
  }

  function shakeIt(Ref: MutableRefObject<any>): void {
    Ref.current?.classList.add("shake");
    setTimeout(() => Ref.current?.classList.remove("shake"), 600);
  }

  return (
    <div className="rootContainer">
      <div className="registrationContainer">
        <h1>Get Started</h1>

        {/* form თაგში სპეციალურად არ ვსვამ(ტრივიალური იქნება, 
              მაგრამ არ ვარ დარწმუნებული Best Practice_ია თუ არა) */}
        <label htmlFor="userImage">
          add a photo
          <br />
          <img
            src={userImage}
            alt="uploadImageLogo"
            id="uploadImageLogo"
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
          accept="image/*"
          hidden
          ref={userImageInputRef}
          onChange={handleImageChange}
        />
        <br />

        <label htmlFor="userName">fill in your name</label>
        <br />
        <input
          type="text"
          id="userName"
          placeholder="your name"
          ref={userNameRef}
        />
        <br />

        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}
