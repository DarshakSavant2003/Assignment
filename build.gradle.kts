plugins {
    alias(libs.plugins.android.application)  // This uses the version from libs.versions.toml
}

android {
    namespace = "com.example.jobportal"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.jobportal"
        minSdk = 21
        targetSdk = 33
        versionCode = 1
        versionName = "1.0"

        // Java compatibility
        compileOptions {
            sourceCompatibility = JavaVersion.VERSION_1_8
            targetCompatibility = JavaVersion.VERSION_1_8
        }
    }
//    sourceSets {
//        main {
//            manifest.srcFile 'src/main/AndroidManifest.xml'
//        }
//    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
}

dependencies {
    implementation(libs.core.ktx) // Correctly refers to core-ktx
    implementation(libs.appcompat) // Correct alias reference to appcompat
    implementation(libs.material) // Correct alias reference to material

    // Retrofit for API calls
    implementation(libs.retrofit) // Correct alias reference to retrofit
    implementation(libs.converter.gson) // Correct alias reference to converter-gson

    // Gson for JSON parsing
    implementation(libs.gson) // Correct alias reference to gson
}
