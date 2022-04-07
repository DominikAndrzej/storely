package com.example.smartrecordmobileapp.ui.notifications

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.smartrecordmobileapp.R
import com.example.smartrecordmobileapp.databinding.FragmentSettingsBinding

class SettingsFragment : Fragment() {

    private lateinit var viewModel: SettingsViewModel
    private var _binding: FragmentSettingsBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewModel =
            ViewModelProvider(this).get(SettingsViewModel::class.java)

        _binding = FragmentSettingsBinding.inflate(inflater, container, false)
        val root: View = binding.root


        val textView: TextView = binding.textSettings
        viewModel.text.observe(viewLifecycleOwner, Observer {
            textView.text = it
        })

        increaseText()

        return root
    }

    /**
     * increaseNumbTextView - staje się wskaźnikiem na element widoku poprzez binding i przypisuje wartość danemu elementowi
     * increaseButton - staje się wskaźnikiem na element widoku - || -
     * viewModel.currentNumbToIncrease.value = ++viewModel.number - incrementuje zmienną z viewModel i przypisuje ją do objektu
     */
    private fun increaseText() {

        val increaseNumbTextView: TextView = binding.increaseNumbTextView
        viewModel.currentNumbToIncrease.observe(viewLifecycleOwner, {
            increaseNumbTextView.text = it.toString()
        })

        val increaseButton: Button = binding.increaseButton

        increaseButton.setOnClickListener {
            viewModel.currentNumbToIncrease.value = ++viewModel.number
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }


}

//fragmenty wchodzą w interakcje z użytkownikiem i prezentują mu dane
//z kolei view model wykonuje operacje na danych
//  user -> fragment -> viewmodel -> fragment -> xml -> user
//  viewModel.text.observe --- w ten sposób pobierasz liveData, na liveData pracuje viewModel
// w fragmencie/aktywności używasz bindingu