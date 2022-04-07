package com.example.storelyServer.user;

public class UserPutDto {

    private String newEmail;
    private String newPassword;
    private String password;

    public UserPutDto(String newEmail, String newPassword, String password) {
        this.newEmail = newEmail;
        this.newPassword = newPassword;
        this.password = password;
    }

    public UserPutDto() {
    }

    public String getNewEmail() {
        return newEmail;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
