//
//  AppDelegate.swift
//  MagnetoMacOS
//
//  Created by Frederico Vilela Curti on 08/12/20.
//  Copyright © 2020 Frederico Vilela Curti. All rights reserved.
//

import Cocoa
import SwiftUI
import Foundation

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {
    var popover: NSPopover!
    var magnetoJsPath: String!
    var magnetUrl: String!
    
    func application(_ application:NSApplication, open urls: [URL]) {
        if (urls.count == 0) {
            return
        }
        
        var path = Bundle.main.urls(forResourcesWithExtension: nil, subdirectory: "", localization: nil)
        path = path?.filter({ (u) -> Bool in
            return u.absoluteString.contains("Magnetojs")
        })
        
        magnetoJsPath = path?.first?.absoluteString.replacingOccurrences(of: "file://", with: "") ?? ""
        magnetUrl = urls.first?.absoluteString ?? ""
        
        if (magnetUrl != nil) {
            executeCommand(command: magnetoJsPath, args: [magnetUrl])
        }
        
        exit(3)
    }
    
    func executeCommand(command: String, args: [String]) {
        let task = Process()

        task.launchPath = command
        task.arguments = args

        let pipe = Pipe()
        task.standardOutput = pipe
        task.launch()
        pipe.fileHandleForReading.readDataToEndOfFile()
    }
}

