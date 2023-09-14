export interface SpotifyPlayerState {
    device:                 Device;
    repeat_state:           string;
    shuffle_state:          boolean;
    context:                Context;
    timestamp:              number;
    progress_ms:            number;
    is_playing:             boolean;
    item:                   Item;
    currently_playing_type: string;
    actions:                Actions;
}

export interface Actions {
    disallows: Disallows;
}

export interface Disallows {
    resuming:      boolean;
    skipping_prev: boolean;
}

export interface Context {
    type:          string;
    href:          string;
    external_urls: ExternalUrls;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Device {
    id:                 string;
    is_active:          boolean;
    is_private_session: boolean;
    is_restricted:      boolean;
    name:               string;
    type:               string;
    volume_percent:     number;
    supports_volume:    boolean;
}

export interface Item {
    album:             Album;
    artists:           Artist[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_ids:      ExternalIDS;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    name:              string;
    popularity:        number;
    preview_url:       string;
    track_number:      number;
    type:              string;
    uri:               string;
    is_local:          boolean;
}

export interface Album {
    album_type:             string;
    total_tracks:           number;
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           Date;
    release_date_precision: string;
    type:                   string;
    uri:                    string;
    artists:                Artist[];
}

export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          string;
    uri:           string;
}

export interface Image {
    url:    string;
    height: number;
    width:  number;
}

export interface ExternalIDS {
    isrc: string;
}
