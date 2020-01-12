// 映射
interface MapObj {
  a: string;
  b: number;
  c: boolean;
}

type ReadonlyObj = Readonly<MapObj>
type PartialObj = Partial<MapObj>
type PickObj = Pick<MapObj, 'a' | 'b'>

// 非同态
type RecordObj = Record<'x' | 'y', MapObj>
