export default class cr {
  static str(status: TStatus, msg: string): IReturn {
    return { status, msg };
  }

  static load(status: TStatus, load: TLoad): IReturn {
    return { status, load };
  }

  static strLoad(status: TStatus, msg: string, load: TLoad): IReturn {
    return { status, msg, load };
  }
}

type TStatus = "ok" | "bad" | "fail";
type TLoad = { [index: string]: unknown };

interface IReturn {
  status: TStatus;
  msg?: string;
  load?: TLoad;
}
