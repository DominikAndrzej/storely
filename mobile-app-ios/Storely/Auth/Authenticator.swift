//
//  Authenticator.swift
//  Storely
//
//  Created by Michał Chruścielski on 15/02/2022.
//

import Foundation
import UIKit
import SwiftCoroutine

protocol Authenticator {
    
    func getAccessToken() -> CoFuture<String>
    
    func refreshAccessToken() -> CoFuture<String>

    func login(viewController: UIViewController) -> CoFuture<Void>

    func logout(viewController: UIViewController) -> CoFuture<Void>

}
