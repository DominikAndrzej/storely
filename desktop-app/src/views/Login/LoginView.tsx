import styles from "../../styles/Login.module.scss";
import {LoginViewProps} from "./LoginViewProps";
function LoginView(props:LoginViewProps):JSX.Element {

    function submit(e:any){
        props.onLogin(e.target.email.value, e.target.password.value);
    }

  return (
      <div className={styles.loginBox}>
        <form onSubmit={submit}>
          <p>Zaloguj się do systemu</p>
            <p>{props.error}</p>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Hasło" name="password"/>
          <button>Zaloguj</button>
        </form>
      </div>
  );
}

export default LoginView;
