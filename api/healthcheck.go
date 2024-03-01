package main

import (
	"net/http"

	"github.com/go-chi/render"
)

func (api *API) healthcheck(w http.ResponseWriter, r *http.Request) {
	render.JSON(w, r, struct {
		Status string `json:"status"`
	}{
		Status: "healthy",
	})
}
