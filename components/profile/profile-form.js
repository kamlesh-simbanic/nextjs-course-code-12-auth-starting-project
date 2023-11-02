import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const newPasswodRef = useRef();
  const oldPasswordRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswodRef.current.value;

    props.onChangePassword({
      oldPassword,
      newPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Passsword</label>
        <input type="password" id="new-password" ref={newPasswodRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
