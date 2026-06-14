import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import type { MessageWorkflowParams } from "../slack-webhook-handler";

/**
 * Durable, retriable handler for a user-addressed Slack message
 * (`app_mention` or DM). The gateway triggers one instance per Slack
 * `event_id`; all real processing happens here, off the ack path.
 *
 * Phase 1 stub: log only. Phase 3 wires the Agent Router + A2A dispatch and
 * posts the reply back to Slack (see PLAN.md §C).
 */
export class MessageWorkflow extends WorkflowEntrypoint<
  Env,
  MessageWorkflowParams
> {
  async run(event: WorkflowEvent<MessageWorkflowParams>, step: WorkflowStep) {
    await step.do("log-message-event", async () => {
      const { eventId, eventType, channelId, userId } = event.payload;
      console.log("MessageWorkflow received event", {
        instanceId: event.instanceId,
        eventId,
        eventType,
        channelId,
        userId
      });
    });
    // TODO(phase-3): resolve target agent, build UserAuthContext, dispatch over
    // A2A, and post the response back to Slack.
  }
}
