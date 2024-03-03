package main

import (
	"net/http"

	"github.com/go-chi/render"
)

type HttpErrResponse struct {
	Ok      bool   `json:"ok"`
	Message string `json:"message"`
	Error   string `json:"error,omitempty"`
	Status  int    `json:"-"`
}

func (http *HttpErrResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, http.Status)
	return nil
}

func ErrInternalServerError(err error) render.Renderer {
	return &HttpErrResponse{
		Ok:      false,
		Message: "Internal Server Error",
		Error:   err.Error(),
		Status:  http.StatusInternalServerError,
	}
}

func ErrBadRequest(err error) render.Renderer {
	return &HttpErrResponse{
		Ok:      false,
		Message: "Bad Request",
		Error:   err.Error(),
		Status:  http.StatusBadRequest,
	}
}

func ErrNotFound() render.Renderer {
	return &HttpErrResponse{
		Ok:      false,
		Message: "Not Found",
		Status:  http.StatusNotFound,
	}
}
