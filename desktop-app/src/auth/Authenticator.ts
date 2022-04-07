export interface Authenticator {

    initialise(): Promise<void>;

    isLoggedIn(): Promise<boolean>;

    getAccessToken(): Promise<string>;

    refreshToken(): Promise<string>;

    login(email:string, password:string): Promise<void>;

    logout(): Promise<void>;

}