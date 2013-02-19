package com.josuebasurto.startupweekend3;

import android.os.Bundle;
import org.apache.cordova.*;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.setIntegerProperty("splashscreen", R.drawable.splash);
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html", 5000);
	}
	
	@Override
	protected void onResume() {
		super.onResume();
	}
}
