//
//  Login.swift
//  Storely
//
//  Created by Michał Chruścielski on 29/01/2022.
//

import SwiftUI

struct Login: View {
    var body: some View {
        VStack{
            Spacer()
            
            VStack {
                TextField("Email", text: .constant(""))
                    .padding()
                    .overlay(RoundedRectangle(cornerRadius: 10)
                                .stroke(Color("DarkGrayAccentColor"), lineWidth: 2)
                        )
                
                SecureField("Password", text: .constant(""))
                    .padding()
                    .overlay(RoundedRectangle(cornerRadius: 10)
                                .stroke(Color("DarkGrayAccentColor"), lineWidth: 2)
                        )
                
                Button("Zaloguj"){
                    
                }
                .frame(minWidth: 0, maxWidth: .infinity)
                .scaledToFit()
                .padding()
                .background(Color("MainColor"))
                .foregroundColor(Color.white)
                .cornerRadius(10)
                
                    
                
                   
                    
            }
            .padding(.horizontal)
            
            Spacer()
            
            Text("Zapomniałem hasła")
                .padding()
        
        }
        

    }
}

struct Login_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            Login()
        }
    }
}
