package com.etti.ld.lic2021.message;

/**
 * This class is used for messaging the client-side of the application used in Rest Controller and Exception Handler.
 */

public class ResponseMessage {
    private String message;

    public ResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}


