package com.example.smartrecordmobileapp.ui.scanning

import android.content.Intent
import android.content.pm.PackageManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.PackageManagerCompat
import com.budiyev.android.codescanner.AutoFocusMode
import com.budiyev.android.codescanner.CodeScanner
import com.example.smartrecordmobileapp.R
import com.budiyev.android.codescanner.CodeScannerView
import com.budiyev.android.codescanner.DecodeCallback
import com.budiyev.android.codescanner.ErrorCallback
import com.budiyev.android.codescanner.ScanMode
import com.example.smartrecordmobileapp.MainActivity
import com.example.smartrecordmobileapp.databinding.ActivityScanBinding

private const val CAMERA_REQUEST_CODE = 101

class Scan : AppCompatActivity() {
    private lateinit var codeScanner: CodeScanner

    private lateinit var binding: ActivityScanBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityScanBinding.inflate(layoutInflater)
        setContentView(binding.root)

        startMainActivity()
        setupPermissions()
        codeScanner()
    }

    fun startMainActivity(){
        val btnGoToMainActivity = binding.btnClose

        btnGoToMainActivity.setOnClickListener {
            finish()
        }
    }


    private fun codeScanner() {
        val scanView = findViewById<CodeScannerView>(R.id.scanView)
        codeScanner = CodeScanner(this, scanView)

        codeScanner.apply {
            camera = CodeScanner.CAMERA_BACK
            formats = CodeScanner.ALL_FORMATS

            autoFocusMode = AutoFocusMode.SAFE
            scanMode = ScanMode.SINGLE
            isAutoFocusEnabled = true
            isFlashEnabled = false

            decodeCallback = DecodeCallback {
                runOnUiThread {

                    val tv_textView = findViewById<TextView>(R.id.tv_textView)

                    tv_textView.text = it.text
                }
            }

            errorCallback = ErrorCallback {
                runOnUiThread{
                    Log.e("Scan", "Camera initialization error: ${it.message}")
                }
            }
        }

        scanView.setOnClickListener {
            codeScanner.startPreview()
        }


    }

    override fun onResume() {
        super.onResume()
        codeScanner.startPreview()
    }

    override fun onPause() {
        codeScanner.releaseResources()
        super.onPause()
    }

    private fun setupPermissions() {
        val permission = ContextCompat.checkSelfPermission(this, android.Manifest.permission.CAMERA)

        if(permission != PackageManager.PERMISSION_GRANTED) {
            makeRequest()
        }
    }

    private fun makeRequest() {
        ActivityCompat.requestPermissions(this, arrayOf(android.Manifest.permission.CAMERA), CAMERA_REQUEST_CODE)
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        when (requestCode){
            CAMERA_REQUEST_CODE -> {
                if (grantResults.isEmpty() || grantResults[0] != PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(this, "You need the camera permission to be able to use this app!", Toast.LENGTH_SHORT).show()
                } else {
                    //successful
                }
            }
        }

    }
}