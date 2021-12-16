import { PackageViewsStats } from '../types';
import { getLast30Days, getSeriesDataPerPkgVersionViews, sumViewsPerVersions } from './viewsStats';

interface TestSumViews {
  data: PackageViewsStats;
  excluded?: string[];
  result: number[][];
}

interface TestGetSeries {
  data: PackageViewsStats;
  version: string;
  result: number[][];
}

const tests1: TestSumViews[] = [
  { data: {}, result: [] },
  {
    data: { '1.0.0': { '2021-12-09': 1 } },
    result: [
      [1639440000000, 0],
      [1639353600000, 0],
      [1639267200000, 0],
      [1639180800000, 0],
      [1639094400000, 0],
      [1639008000000, 1],
      [1638921600000, 0],
      [1638835200000, 0],
      [1638748800000, 0],
      [1638662400000, 0],
      [1638576000000, 0],
      [1638489600000, 0],
      [1638403200000, 0],
      [1638316800000, 0],
      [1638230400000, 0],
      [1638144000000, 0],
      [1638057600000, 0],
      [1637971200000, 0],
      [1637884800000, 0],
      [1637798400000, 0],
      [1637712000000, 0],
      [1637625600000, 0],
      [1637539200000, 0],
      [1637452800000, 0],
      [1637366400000, 0],
      [1637280000000, 0],
      [1637193600000, 0],
      [1637107200000, 0],
      [1637020800000, 0],
      [1636934400000, 0],
    ],
  },
  {
    data: {
      '11.1.9': { '2021-12-08': 2, '2021-12-10': 18, '2021-12-14': 48, '2021-12-12': 38, '2021-12-13': 27 },
      '10.0.8': { '2021-12-13': 1 },
      '11.1.8': { '2021-12-13': 1 },
      '11.0.1': { '2021-12-14': 2 },
      '11.0.6': { '2021-12-13': 1 },
      '10.3.1': { '2021-12-13': 1 },
      '11.1.7': { '2021-12-10': 3, '2021-12-14': 6 },
      '11.0.2': { '2021-12-14': 3 },
    },
    result: [
      [1639440000000, 59],
      [1639353600000, 31],
      [1639267200000, 38],
      [1639180800000, 0],
      [1639094400000, 21],
      [1639008000000, 0],
      [1638921600000, 2],
      [1638835200000, 0],
      [1638748800000, 0],
      [1638662400000, 0],
      [1638576000000, 0],
      [1638489600000, 0],
      [1638403200000, 0],
      [1638316800000, 0],
      [1638230400000, 0],
      [1638144000000, 0],
      [1638057600000, 0],
      [1637971200000, 0],
      [1637884800000, 0],
      [1637798400000, 0],
      [1637712000000, 0],
      [1637625600000, 0],
      [1637539200000, 0],
      [1637452800000, 0],
      [1637366400000, 0],
      [1637280000000, 0],
      [1637193600000, 0],
      [1637107200000, 0],
      [1637020800000, 0],
      [1636934400000, 0],
    ],
  },
  {
    data: {
      '11.1.9': { '2021-12-08': 2, '2021-12-10': 18, '2021-12-14': 48, '2021-12-12': 38, '2021-12-13': 27 },
      '10.0.8': { '2021-12-13': 1 },
      '11.1.8': { '2021-12-13': 1 },
      '11.0.1': { '2021-12-14': 2 },
      '11.0.6': { '2021-12-13': 1 },
      '10.3.1': { '2021-12-13': 1 },
      '11.1.7': { '2021-12-10': 3, '2021-12-14': 6 },
      '11.0.2': { '2021-12-14': 3 },
    },
    excluded: ['11.1.9', '11.1.8', '11.1.7'],
    result: [
      [1639440000000, 5],
      [1639353600000, 3],
      [1639267200000, 0],
      [1639180800000, 0],
      [1639094400000, 0],
      [1639008000000, 0],
      [1638921600000, 0],
      [1638835200000, 0],
      [1638748800000, 0],
      [1638662400000, 0],
      [1638576000000, 0],
      [1638489600000, 0],
      [1638403200000, 0],
      [1638316800000, 0],
      [1638230400000, 0],
      [1638144000000, 0],
      [1638057600000, 0],
      [1637971200000, 0],
      [1637884800000, 0],
      [1637798400000, 0],
      [1637712000000, 0],
      [1637625600000, 0],
      [1637539200000, 0],
      [1637452800000, 0],
      [1637366400000, 0],
      [1637280000000, 0],
      [1637193600000, 0],
      [1637107200000, 0],
      [1637020800000, 0],
      [1636934400000, 0],
    ],
  },
];

const tests2: TestGetSeries[] = [
  { data: {}, version: '1.0.0', result: [] },
  { data: { '11.1.7': { '2021-12-10': 3, '2021-12-14': 6 } }, version: '1.0.0', result: [] },
  {
    data: {
      '11.1.9': { '2021-12-08': 2, '2021-12-10': 18, '2021-12-14': 48, '2021-12-12': 38, '2021-12-13': 27 },
      '10.0.8': { '2021-12-13': 1 },
      '11.1.8': { '2021-12-13': 1 },
      '11.0.1': { '2021-12-14': 2 },
      '11.0.6': { '2021-12-13': 1 },
      '10.3.1': { '2021-12-13': 1 },
      '11.1.7': { '2021-12-10': 3, '2021-12-14': 6 },
      '11.0.2': { '2021-12-14': 3 },
    },
    version: '11.1.7',
    result: [
      [1639440000000, 6],
      [1639353600000, 0],
      [1639267200000, 0],
      [1639180800000, 0],
      [1639094400000, 3],
      [1639008000000, 0],
      [1638921600000, 0],
      [1638835200000, 0],
      [1638748800000, 0],
      [1638662400000, 0],
      [1638576000000, 0],
      [1638489600000, 0],
      [1638403200000, 0],
      [1638316800000, 0],
      [1638230400000, 0],
      [1638144000000, 0],
      [1638057600000, 0],
      [1637971200000, 0],
      [1637884800000, 0],
      [1637798400000, 0],
      [1637712000000, 0],
      [1637625600000, 0],
      [1637539200000, 0],
      [1637452800000, 0],
      [1637366400000, 0],
      [1637280000000, 0],
      [1637193600000, 0],
      [1637107200000, 0],
      [1637020800000, 0],
      [1636934400000, 0],
    ],
  },
];

describe('ViewsStats', () => {
  beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1639468828000);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getLast30Days', () => {
    it('returns last 30 days', () => {
      const actual = getLast30Days();
      expect(actual).toEqual([
        '2021-12-14',
        '2021-12-13',
        '2021-12-12',
        '2021-12-11',
        '2021-12-10',
        '2021-12-09',
        '2021-12-08',
        '2021-12-07',
        '2021-12-06',
        '2021-12-05',
        '2021-12-04',
        '2021-12-03',
        '2021-12-02',
        '2021-12-01',
        '2021-11-30',
        '2021-11-29',
        '2021-11-28',
        '2021-11-27',
        '2021-11-26',
        '2021-11-25',
        '2021-11-24',
        '2021-11-23',
        '2021-11-22',
        '2021-11-21',
        '2021-11-20',
        '2021-11-19',
        '2021-11-18',
        '2021-11-17',
        '2021-11-16',
        '2021-11-15',
      ]);
    });
  });

  describe('sumObjectValues', () => {
    for (let i = 0; i < tests1.length; i++) {
      it('returns series data', () => {
        const actual = sumViewsPerVersions(tests1[i].data, tests1[i].excluded);
        expect(actual).toEqual(tests1[i].result);
      });
    }
  });

  describe('getSeriesDataPerPkgVersionViews', () => {
    for (let i = 0; i < tests2.length; i++) {
      it('returns data', () => {
        const actual = getSeriesDataPerPkgVersionViews(tests2[i].data, tests2[i].version);
        expect(actual).toEqual(tests2[i].result);
      });
    }
  });
});