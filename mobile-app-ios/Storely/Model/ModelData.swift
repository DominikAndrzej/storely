//
//  ModelData.swift
//  Storely
//
//  Created by Michał Chruścielski on 29/01/2022.
//

import Foundation
import Combine


final class ModelData: ObservableObject {
    @Published var isNonLogged: Bool = false

    
    
    //    var hikes: [Hike] = load("hikeData.json")
//
//    var features: [Landmark] {
//        landmarks.filter { $0.isFeatured }
//    }
//
//    var categories: [String: [Landmark]] {
//        Dictionary(
//            grouping: landmarks,
//            by: { $0.category.rawValue }
//        )
//    }
}
