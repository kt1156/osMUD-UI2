package main

import (
	"net/http"

	"github.com/go-chi/render"
)

func (api *API) GetAllOsMudEntries(w http.ResponseWriter, r *http.Request) {
	entries, err := api.osMudReader.ReadAll()
	if err != nil {
		render.Render(w, r, ErrInternalServerError(err))
	}

	render.JSON(w, r, entries)
}
