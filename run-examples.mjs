// Calendar reference for the nine published examples. No external packages.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile(new URL('./cases.json', import.meta.url), 'utf8'));
const day = 86_400_000;
function parseDate(value) {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/);
  const valueMs = Date.parse(value + 'T00:00:00Z');
  assert.ok(Number.isFinite(valueMs) && new Date(valueMs).toISOString().slice(0, 10) === value, 'Invalid date');
  return valueMs;
}
function referenceResult(item) {
  const weekends = new Set(item.weekendDays);
  assert.ok([...weekends].every(value => Number.isInteger(value) && value >= 0 && value <= 6));
  const holidays = new Set(item.holidayDates.map(value => parseDate(value)));
  const working = value => !weekends.has(new Date(value).getUTCDay()) && !holidays.has(value);
  const start = parseDate(item.startDate);
  if (item.mode === 'range') {
    const end = parseDate(item.endDate);
    const direction = start <= end ? 1 : -1;
    const low = Math.min(start, end) + (item.includeEndpoints ? 0 : day);
    const high = Math.max(start, end) - (item.includeEndpoints ? 0 : day);
    assert.ok((high - low) / day <= 100_000, 'Range too long');
    let count = 0;
    for (let cursor = low; cursor <= high; cursor += day) if (working(cursor)) count += 1;
    return direction * count;
  }
  assert.ok(item.mode === 'add' || item.mode === 'subtract', 'Unknown operation');
  assert.ok(Number.isInteger(item.days) && item.days >= 0 && item.days <= 10_000);
  assert.ok(weekends.size < 7, 'Calendar has no working weekdays');
  let remaining = item.days;
  let cursor = start;
  let steps = 0;
  while (remaining > 0) {
    assert.ok(steps++ < 100_000, 'Shift too long');
    cursor += item.mode === 'subtract' ? -day : day;
    if (working(cursor)) remaining -= 1;
  }
  return new Date(cursor).toISOString().slice(0, 10);
}
assert.equal(data.cases.length, 9);
assert.equal(new Set(data.cases.map(item => item.id)).size, data.cases.length);
for (const item of data.cases) {
  const actual = referenceResult(item);
  assert.equal(actual, item.expected, item.id);
  console.log('OK ' + item.id + ': ' + actual);
}
console.log('9/9 examples passed. Calendar reference only; Excel is not executed.');
