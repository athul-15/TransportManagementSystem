class SortStrategy {
  sort(data) {
    throw new Error("sort() must be implemented");
  }
}

class SortByFare extends SortStrategy {
  sort(data) {
    return data.sort((a, b) => a.fare - b.fare);
  }
}

class SortByTime extends SortStrategy {
  sort(data) {
    return data.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  }
}

class BusSorter {
  constructor(strategy) {
    this._strategy = strategy;
  }

  setStrategy(strategy) {
    this._strategy = strategy;
  }

  sort(buses) {
    return this._strategy.sort(buses);
  }
}

module.exports = { BusSorter, SortByFare, SortByTime };
