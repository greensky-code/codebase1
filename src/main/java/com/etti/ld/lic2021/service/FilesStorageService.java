package com.etti.ld.lic2021.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

/**
 * This interface is for initializing storage, saving new file, loading file, getting list of Files' info, deleting all files.
 */

public interface FilesStorageService {

    public void init();

    public void save(MultipartFile file);

    public Resource load(String filename);

    public void deleteAll();

    public Stream<Path> loadAll();

}
