//
//  StorelyApp.swift
//  Storely
//
//  Created by Michał Chruścielski on 29/01/2022.
//

import SwiftUI

@main
struct StorelyApp: App {
    @StateObject private var modelData = ModelData()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(modelData)
        }
    }
}
