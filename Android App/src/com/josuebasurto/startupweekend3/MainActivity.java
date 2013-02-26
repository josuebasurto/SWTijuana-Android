package com.josuebasurto.startupweekend3;

import android.os.Bundle;
import org.apache.cordova.*;
import com.josuebasurto.fw.constantes;
import com.josuebasurto.fw.notificaciones;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		//super.setIntegerProperty("splashscreen", R.drawable.splash);
		try {
			super.loadUrl(constantes.K_GetLocalUrl);
			//notificaciones.DoToast("Iniciando...", getApplicationContext());			
		} catch (Exception e) {
			notificaciones.DoToast(e.getMessage(), getApplicationContext());
		}
	}
	
	@Override
	protected void onResume() { 
		super.onResume();
	}
}
