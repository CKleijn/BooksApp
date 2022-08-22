const express = require("express");
const assert = require("assert");
const {connValues} = require("../../database/db_conn");
const mysql = require("mysql2/promise");

exports.validateCreateBook = (req, res, next) => {
    const {title, description, author} = req.body;
    try {
        assert(typeof title === "string", "title must be a string!");
        assert(typeof description === "string", "description must be a string!");
        assert(typeof author === "string", "author must be a string!");
        next();
    } catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}

exports.validateUpdateBook = (req, res, next) => {
    const {title, description, author} = req.body;
    try {
        title && assert(typeof title === "string", "title must be a string!");
        description && assert(typeof description === "string", "description must be a string!");
        author && assert(typeof author === "string", "author must be a string!");
        next();
    } catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}

exports.getAllBooks = async (req, res) => {
    const connection = await mysql.createConnection(connValues);
    const [rows, fields] = await connection.execute("SELECT * FROM book");
    connection.end();

    res.status(200).json({
        status: 200,
        result: rows
    });

    res.end();
}

exports.createBook = async (req, res) => {
    const {title, description, author} = req.body;

    const connection = await mysql.createConnection(connValues);
    const [rows, fields] = await connection.execute("INSERT INTO book (title, description, author) VALUES (?, ?, ?)", [title, description, author]);
    connection.end();

    res.status(201).json({
        status: 201,
        message: "Book has been succesfully created!"
    });

    res.end();
}

exports.getBook = async (req, res, next) => {
    const bookId = req.params.bookId;

    const connection = await mysql.createConnection(connValues);
    const [rows, fields] = await connection.execute("SELECT * FROM book WHERE id = ?", [bookId]);
    connection.end();

    if(rows.length > 0) {
        res.status(200).json({
            status: 200,
            result: rows
        });
    
        res.end();
    } else {
        return next({
            status: 404,
            message: "This book doesn't exist!"
        });
    }
}

exports.updateBook = async (req, res, next) => {
    const bookId = req.params.bookId;

    const connection = await mysql.createConnection(connValues);
    const [rowsSelect, fieldsSelect] = await connection.execute("SELECT * FROM book WHERE id = ?", [bookId]);

    if(rowsSelect.length > 0) {
        const updatedBook = {
            ...rowsSelect,
            ...req.body
        }
    
        const [rowsUpdate, fieldsUpdate] = await connection.execute("UPDATE book SET title = ?, description = ?, author = ? WHERE id = ?", [updatedBook.title, updatedBook.description, updatedBook.author, bookId]);
        connection.end();
    
        res.status(200).json({
            status: 200,
            message: "Book has been succesfully updated!"
        });
    
        res.end();
    } else {
        return next({
            status: 404,
            message: "This book doesn't exist!"
        });
    }
}

exports.deleteBook = async (req, res, next) => {
    const bookId = req.params.bookId;

    const connection = await mysql.createConnection(connValues);
    const [rows, fields] = await connection.execute("DELETE FROM book WHERE id = ?", [bookId]);
    connection.end();

    if(rows.length > 0) {
        res.status(200).json({
            status: 200,
            message: "Book has been succesfully deleted!"
        });
    
        res.end();
    } else {
        return next({
            status: 404,
            message: "This book doesn't exist!"
        });
    }
}