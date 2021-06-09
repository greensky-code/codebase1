package com.etti.ld.lic2021;

import com.etti.ld.lic2021.service.FilesStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;

@SpringBootApplication
public class Lic2021Application implements CommandLineRunner {

	@Resource
	FilesStorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(Lic2021Application.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
//		storageService.deleteAll();
//		storageService.init();

	}

}
