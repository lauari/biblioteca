package com.biblioteca.biblioteca.interfaceService;

import java.util.List;
import java.util.Optional;

import com.biblioteca.biblioteca.models.libro;

public interface ilibroService {

    public String save(libro libro);

    public List<libro> findAll();

    public List<libro> libroExist(String Título, String Autor, String Genero);

    public Optional<libro> findOne(String id);

    //cambiar el int
    public int delete(String id);

}
