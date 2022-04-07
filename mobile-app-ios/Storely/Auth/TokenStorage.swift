//
//  TokenStorage.swift
//  Storely
//
//  Created by Michał Chruścielski on 18/02/2022.
//

import Foundation
import SwiftKeychainWrapper


class TokenStorage {

    private var token: String
    private let storageKey = "com.storely.storelyapp.token"
    
    init(){
        self.token = ""
    }

    func loadToken() -> String? {

        if self.token != "" {
            return self.token
        }

        self.loadTokenData()
        return self.token
    }

    
    func saveToken(newToken: String) {
        self.token = newToken
        self.saveTokenData()
    }

    
    func removeToken() {
        self.token = ""
        KeychainWrapper.standard.removeObject(forKey: self.storageKey)
    }


    private func loadTokenData() {

        
        if self.token != "" {
            return
        }

        let jsonText = KeychainWrapper.standard.string(forKey: self.storageKey)
        if jsonText == nil {
            return
        }

        self.token = jsonText!
        
//        let data = jsonText!.data(using: .utf8)
//        let decoder = JSONDecoder()
//        self.tokenData = try? decoder.decode(TokenData.self, from: data!)
    }


    private func saveTokenData() {

//        let encoder = JSONEncoder()
//        let jsonText = try? encoder.encode(self.token)
//        if jsonText != nil {
//
//        }
//
        KeychainWrapper.standard.set(self.token, forKey: self.storageKey)
    }
}
