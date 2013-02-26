package com.josuebasurto.fw;

import android.content.Context;
import android.widget.Toast;

public class notificaciones {
	public static void DoToast(String string, Context context){
		Toast toast = Toast.makeText(context, string, Toast.LENGTH_SHORT);
		toast.show();
	}
}
