import { useSharedPoll } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";
const options = [
  { id: "green", label: "Go for it" },
  { id: "yellow", label: "Need context" },
  { id: "red", label: "Not now" },
];

export function Feature({ room, config }: { room: YRoom | null; config: MeshConfig }) {
  const poll = useSharedPoll(room);
  const countFor = (optionId: string) =>
    poll.votes.filter((vote) => vote.optionId === optionId).length;
  const mine = poll.votes.find((vote) => vote.peerId === room?.peerId)?.optionId;

  return (
    <main className="poll-board">
      <h1>{config.appName}</h1>
      <p className="lede">One live pulse check. Every peer gets one vote.</p>
      <p className="poll-count" aria-live="polite">
        {poll.votes.length} peer{poll.votes.length === 1 ? "" : "s"} responded
      </p>
      <div className="poll-options" aria-label="Poll options">
        {options.map((option) => {
          const count = countFor(option.id);
          const selected = mine === option.id;
          return (
            <button
              aria-pressed={selected}
              className={selected ? "option selected" : "option"}
              key={option.id}
              type="button"
              onClick={() => poll.vote(option.id, options)}
            >
              <span>{option.label}</span>
              <strong>{count}</strong>
            </button>
          );
        })}
      </div>
      {mine ? (
        <button className="quiet-action" type="button" onClick={poll.clearMine}>
          Change my answer
        </button>
      ) : (
        <p className="hint">Pick the answer that is closest to your view.</p>
      )}
    </main>
  );
}
