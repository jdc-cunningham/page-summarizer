let wordsCheckedCount = 0;
let wordsToCheck = document.querySelector('div.class-selector ').innerText.split('\n').join(' ').split(' ');
let wordsToCheckLen = wordsToCheck.length;

let toPercent = (num, div) => {
	return Math.floor((num / div) * 100);
}

// pulled from here https://gist.github.com/sebleier/554280
let wordsToIgnoreStr =
	`i
  me
  my
  myself
  we
  our
  ours
  ourselves
  you
  your
  yours
  yourself
  yourselves
  he
  him
  his
  himself
  she
  her
  hers
  herself
  it
  its
  itself
  they
  them
  their
  theirs
  themselves
  what
  which
  who
  whom
  this
  that
  these
  those
  am
  is
  are
  was
  were
  be
  been
  being
  have
  has
  had
  having
  do
  does
  did
  doing
  a
  an
  the
  and
  but
  if
  or
  because
  as
  until
  while
  of
  at
  by
  for
  with
  about
  against
  between
  into
  through
  during
  before
  after
  above
  below
  to
  from
  up
  down
  in
  out
  on
  off
  over
  under
  again
  further
  then
  once
  here
  there
  when
  where
  why
  how
  all
  any
  both
  each
  few
  more
  most
  other
  some
  such
  no
  nor
  not
  only
  own
  same
  so
  than
  too
  very
  s
  t
  can
  will
  just
  don
  should
  now`;
  
let wordsToIgnore = wordsToIgnoreStr.split('\n');

let wordFrequency = {}; // word: count

let approveRejectInterface = (stringToShow) => {
  setTimeout(() => {
    console.log('run >>>', wordsCheckedCount, wordsToCheckLen, toPercent(wordsCheckedCount,wordsToCheckLen), '%');
    if (wordsCheckedCount == wordsToCheckLen) {
        console.log(
            Object
            .keys(wordFrequency)
            .sort(function(a,b){return wordFrequency[b]-wordFrequency[a]})
            .map(word => word + ' ' + wordFrequency[word])
        );
        return;
    }

    if (wordsToIgnore.indexOf(stringToShow) !== -1) {
      wordsCheckedCount += 1;
      approveRejectInterface(wordsToCheck[wordsCheckedCount]);
      return;
    }

    if (stringToShow in wordFrequency) {
    wordFrequency[stringToShow] += 1;
    } else {
    wordFrequency[stringToShow] = 1;
    }

    wordsCheckedCount += 1;

    if (wordsCheckedCount <= wordsToCheckLen) {
      approveRejectInterface(wordsToCheck[wordsCheckedCount]);
    }
  }, 50);
};

approveRejectInterface(wordsToCheck[0]);