//
//  AppView.swift
//  Storely
//
//  Created by Michał Chruścielski on 29/01/2022.
//

import SwiftUI

struct AppView: View {
    
    @State private var selection: Tab = .workshop

    enum Tab {
        case workshop
        case rental
        case settings
    }
    
    var body: some View {
        TabView(selection: $selection) {
            Text("WorkshopView").tabItem { /*@START_MENU_TOKEN@*/Text("Tab Label 1")/*@END_MENU_TOKEN@*/ }.tag(Tab.workshop)
            Text("Tab Content 2").tabItem { /*@START_MENU_TOKEN@*/Text("Tab Label 2")/*@END_MENU_TOKEN@*/ }.tag(Tab.workshop)
        }
              
    }
}

struct AppView_Previews: PreviewProvider {
    static var previews: some View {
        AppView()
    }
}
