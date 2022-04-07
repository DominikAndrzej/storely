package com.example.smartrecordmobileapp.ui.notifications

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class SettingsViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "This is settings Fragment"
    }

    val text: LiveData<String> = _text

    var number = 0

    val currentNumbToIncrease = MutableLiveData<Int>().apply {
        value = 0
    }
}
