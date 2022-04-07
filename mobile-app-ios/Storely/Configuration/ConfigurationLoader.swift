//
//  ConfigurationLoader.swift
//  Storely
//
//  Created by Michał Chruścielski on 18/02/2022.
//

import Foundation

struct ConfigurationLoader {

    static func load() throws -> Configuration {

        guard let filePath = Bundle.main.path(forResource: "app.config", ofType: "json") else {
            throw ErrorFactory.fromMessage(message: "Unable to load mobile configuration file")
        }

        // Create the decoder
        let jsonText = try String(contentsOfFile: filePath)
        let jsonData = jsonText.data(using: .utf8)!
        let decoder = JSONDecoder()

        do {
            // Try to deserialize into an object
            return try decoder.decode(Configuration.self, from: jsonData)

        } catch {

            // Handle errors
            throw ErrorFactory.fromException(
                error: error,
                errorCode: ErrorCodes.configurationError,
                userMessage: "Unable to deserialize mobile configuration file JSON data")
        }
    }
}
