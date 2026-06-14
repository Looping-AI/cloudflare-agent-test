import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import type { LifecycleWorkflowParams } from "../slack-webhook-handler";

/**
 * Durable, retriable handler for non-agent lifecycle events
 * (`member_joined_channel`, `member_left_channel`, `team_join`, and message
 * edits/deletes). The gateway triggers one instance per Slack `event_id`.
 *
 * Phase 1 stub: log only. Phase 2 wires the Registry (D1) — membership/team-join
 * handlers, reconciliation, and channel-history bookkeeping (see PLAN.md §B).
 */
export class LifecycleWorkflow extends WorkflowEntrypoint<
  Env,
  LifecycleWorkflowParams
> {
  async run(event: WorkflowEvent<LifecycleWorkflowParams>, step: WorkflowStep) {
    await step.do("log-lifecycle-event", async () => {
      const { eventId, type, subtype, channelId, userId } = event.payload;
      console.log("LifecycleWorkflow received event", {
        instanceId: event.instanceId,
        eventId,
        type,
        subtype,
        channelId,
        userId
      });
    });
    // TODO(phase-2): update the D1 registry (users/workspaces/agents) and
    // channel-history buffer from the lifecycle event.
  }
}
