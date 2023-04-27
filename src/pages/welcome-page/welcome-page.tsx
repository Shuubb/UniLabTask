import './welcome-page.scss'
import uploadImageLogo from '../../assets/uploadImageLogo.svg'
import { ChangeEvent, MutableRefObject, useRef, useState } from 'react'


export default function WelcomePage() {

  const [image, setImage] = useState<string>(uploadImageLogo);
  const [imageError, setImageError] = useState<string>('');
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) return;

    const regExp = /image\/.*/
    if (regExp.test(e.target.files[0].type)){
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageError('')
    }else
      setImageError('Check Format Of Image!')
    
  }

  function handleSignIn(): void {

    let errorPresent: boolean = false;
    let name: string | undefined;

    function shakeIt(Ref: MutableRefObject<any>): void {
      setTimeout(() => Ref.current?.classList.add('shake'), 500);
      Ref.current?.classList.remove('shake');
      errorPresent = true;
    }

    if(image == uploadImageLogo) shakeIt(imageRef)

    name = nameRef.current?.value;
    name || shakeIt(nameRef)

    if(errorPresent) return 

    localStorage.setItem("userImage", image)
    if(name != undefined)                 // წესით ამის შემოწმება არც არის საჭირო(შეუძლებელია აქამდე მოსულიყო ფუნქცია თუ name = undefined) 
      localStorage.setItem("name", name) // თუმცა TypeScript_ის კომპილატორი მიყვირის..

  }

  return (
    <div className='rootContainer'>
      <div className='registrationContainer'>
          <h1>Get Started</h1>

          {/* form თაგში სპეციალურად არ ვსვამ(ტრივიალური იქნება, 
              მაგრამ არ ვარ დარწმუნებული Best Practice_ია თუ არა) */}
          <label htmlFor="userImage" >
            add a photo<br/>
            
            <img src={image} 
              alt='uploadImageLogo' 
              id='uploadImageLogo' 
              style={image != uploadImageLogo ? {overflow: 'hidden', padding: 0, width: '120px'} : undefined}
              ref={imageRef}
            /><br/>
            <span className='error'>{imageError}</span>
          </label>
          <input 
            type="file" 
            id='userImage' 
            accept="image/*"
            hidden 
            ref={imageInputRef}
            onChange={handleImageChange}
          /><br/>
          
          <label htmlFor="userName">fill in your name</label><br/>
          <input type="text" id='userName' placeholder='your name' ref={nameRef} /><br/>
          
          <button onClick={handleSignIn}>Sign In</button>

      </div>
    </div>
  )
}

