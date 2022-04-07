//
//  AuthenticatorImpl.swift
//  Storely
//
//  Created by Michał Chruścielski on 15/02/2022.
//

import Foundation
import SwiftCoroutine

class AuthenticatorImpl: Authenticator {

    private let configuration: Configuration
    private var tokenStorage: TokenStorage
    //private let concurrencyHandler: ConcurrentActionHandler


    init (configuration: Configuration) {
        self.configuration = configuration
        self.tokenStorage = TokenStorage()
        //self.concurrencyHandler = ConcurrentActionHandler()
    }


    func getAccessToken() -> CoFuture<String> {

        let promise = CoPromise<String>()

        do {
            let accessToken = self.tokenStorage.loadToken()
            if accessToken != "" {

                promise.success(accessToken)

            } else {

                let refreshedAccessToken = try self.refreshAccessToken().await()
                promise.success(refreshedAccessToken)
            }
        } catch {
            promise.fail(error)
        }

        return promise
    }


    func refreshAccessToken() -> CoFuture<String> {

        let promise = CoPromise<String>()
//        let accessToken = self.tokenStorage.loadToken()
//
//        do {
//
//            if accessToken != "" {
//                try self.concurrencyHandler.execute(action: self.performRefreshTokenGrant).await()
//            }
//
//            // Reload and see if we now have a new access token
//            let accessToken = self.tokenStorage.loadTokens()?.accessToken
//            if accessToken != nil {
//
//                // Return the new access token if the refresh succeeded
//                promise.success(accessToken!)
//
//            } else {
//
//                // Otherwise indicate a login is required
//                promise.fail(ErrorFactory.fromLoginRequired())
//            }
//        } catch {
//
//            // Rethrow downstream errors
//
//        }
        promise.fail(error)
        return promise
    }


    func startLogin(
        viewController: UIViewController) -> CoFuture<OIDAuthorizationResponse> {

        let promise = CoPromise<OIDAuthorizationResponse>()

        do {
            // Trigger the login redirect and get the authorization code
            let response = try self.performLoginRedirect(viewController: viewController)
                .await()

            // Indicate success
            promise.success(response)

        } catch {

            // Handle errors
            self.currentOAuthSession = nil
            let uiError = ErrorFactory.fromLoginRequestError(error: error)
            promise.fail(uiError)
        }

        return promise
    }

    /*
     * The authorization code grant runs on a background thread
     */
    func finishLogin(authResponse: OIDAuthorizationResponse) -> CoFuture<Void> {

        let promise = CoPromise<Void>()

        do {

            // Next swap the authorization code for tokens
            try self.exchangeAuthorizationCode(authResponse: authResponse)
                .await()

            // Indicate success and clean up
            promise.success(Void())

        } catch {

            // Handle errors
            let uiError = ErrorFactory.fromLoginResponseError(error: error)
            promise.fail(uiError)
        }

        self.currentOAuthSession = nil
        return promise
    }

    /*
     * The OAuth entry point for logout processing
     */
    func logout(viewController: UIViewController) -> CoFuture<Void> {

        let promise = CoPromise<Void>()

        // Do nothing if already logged out
        let tokenData = self.tokenStorage.loadTokens()
        if tokenData == nil || tokenData!.idToken == nil {
            promise.success(Void())
        }

        do {

            // Clear tokens
            let idToken = tokenData!.idToken!
            self.tokenStorage.removeTokens()

            // Do the work of the logout redirect
            try self.performLogoutRedirect(viewController: viewController, idToken: idToken)
                .await()

            // Indicate success
            promise.success(Void())

        } catch {

            // Handle errors
            let uiError = ErrorFactory.fromLogoutRequestError(error: error)
            promise.fail(uiError)
        }

        self.currentOAuthSession = nil
        return promise
    }


    /*
     * Save tokens from an authoprization code grant or refresh token grant response
     */
    private func saveTokens(tokenResponse: OIDTokenResponse) {

        // Create token data from the response
        let newTokenData = TokenData()
        newTokenData.accessToken = tokenResponse.accessToken!
        if tokenResponse.refreshToken != nil {
            newTokenData.refreshToken = tokenResponse.refreshToken!
        }
        if tokenResponse.idToken != nil {
            newTokenData.idToken = tokenResponse.idToken!
        }

        // Handle missing tokens in the token response
        let oldTokenData = self.tokenStorage.loadTokens()
        if oldTokenData != nil {

            // Maintain the existing refresh token unless we received a new 'rolling' refresh token
            if newTokenData.refreshToken == nil {
                newTokenData.refreshToken = oldTokenData!.refreshToken
            }

            // Maintain the existing id token if required, which may be needed for logout
            if newTokenData.idToken == nil {
                newTokenData.idToken = oldTokenData!.idToken
            }
        }

        // Update storage
        self.tokenStorage.saveTokens(newTokenData: newTokenData)
    }
    
    /*
     * Return the logout manager for the active provider
     */
    private func createLogoutManager() -> LogoutManager {

        if self.configuration.authority.lowercased().contains("cognito") {
            return CognitoLogoutManager(configuration: self.configuration)
        } else {
            return StandardLogoutManager(configuration: self.configuration)
        }
    }
}
