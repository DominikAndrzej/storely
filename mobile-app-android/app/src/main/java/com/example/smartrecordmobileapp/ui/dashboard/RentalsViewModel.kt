package com.example.smartrecordmobileapp.ui.dashboard

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel


class RentalsViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "This is view of my items Fragment"
    }
    val text: LiveData<String> = _text
}