import GogoHttp from "../http/gogo-http";
import GogoParser from "../parsers/gogo-parser";
import { SearchResult as ISearchResult } from "../types/search-result";
import Gogo from "../wrapper/gogo";
import Anime from "./anime";

export default class SearchResult implements ISearchResult {
  name: string;
  url: string;
  img: string;
  released: number;
  type: "dub" | "sub";
  linkName: string;

  private _gogowrap: Gogo;

  constructor(gogowrap: Gogo, data: ISearchResult) {
    this._gogowrap = gogowrap;
    this.name = data.name;
    this.url = data.url;
    this.img = data.img;
    this.released = data.released;
    this.type = data.type;
    this.linkName = data.linkName;
  }

  public async getData() {
    const infoPage = await this._gogowrap.http.getAnimeInfoPage(this.url.split("/")[this.url.split("/").length - 1]);
    return infoPage.document && new Anime(this._gogowrap, this._gogowrap.parser.getAnimeInfo(infoPage.document));
  }

}