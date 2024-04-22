package main

import (
	"net/http"
	"net/url"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"go.uber.org/zap"
)

func (api *API) GetOsMudFile(w http.ResponseWriter, r *http.Request) {
	macAddressParam := chi.URLParam(r, "macAddress")
	macAddressDecoded, err := url.QueryUnescape(macAddressParam)
	if err != nil {
		api.l.Error("unable to escape url parameter", zap.Error(err))
		render.Render(w, r, ErrBadRequest(err))
		return
	}

	entry, err := api.osMudReader.GetOne(macAddressDecoded)
	if err != nil {
		api.l.Error("error fetching record", zap.Error(err))
		render.Render(w, r, ErrInternalServerError(err))
		return
	}
	if entry == nil {
		api.l.Warn("requested record does not exist", zap.String("macAddress", macAddressDecoded))
		render.Render(w, r, ErrNotFound())
		return
	}

	file, err := os.ReadFile(entry.MudLocation) // This location is only set by osmud
	if err != nil {
		api.l.Error("error attempting to read file", zap.Error(err))
		render.Render(w, r, ErrInternalServerError(err))
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(file)
}
