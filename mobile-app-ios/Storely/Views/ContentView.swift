//
//  ContentView.swift
//  Storely
//
//  Created by Michał Chruścielski on 29/01/2022.
//

import SwiftUI

struct ContentView: View {
    
    @State private var selection: Tab = .workshop
    @EnvironmentObject var modelData: ModelData
    
    enum Tab {
        case workshop
        case rentals
        case settings
    }
    
    var body: some View {
        TabView(selection: $selection) {
            WorkshopView().tabItem { Text("Tab Label 1") }.tag(Tab.workshop)
            Text("Tab Content 2").tabItem { /*@START_MENU_TOKEN@*/Text("Tab Label 2")/*@END_MENU_TOKEN@*/ }.tag(Tab.rentals)
            Text("Tab Content 3").tabItem { Text("Tab Label 3") }.tag(Tab.settings)
        }
        .fullScreenCover(isPresented:$modelData.isNonLogged) {
            LoginView()}
              
    }
        
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(ModelData())

    }
}
