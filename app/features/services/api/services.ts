import { supabase } from "@/app/lib/supabaseClient";
import { ServiceStep } from "@/app/types/types";

export const getAllServices = async () => {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceById = async (id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getServicesByCategoryId = async (category_id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("category_id", category_id);

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceSteps = async (service_id: string) => {
  const { data, error } = await supabase
    .from("service_steps")
    .select("*")
    .eq("service_id", service_id)
    .order("step_number", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceRequirements = async (service_steps_id: string) => {
  const { data, error } = await supabase
    .from("service_requirements")
    .select("*")
    .eq("service_steps_id", service_steps_id);

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Starts a service for a given user by creating a trip,
 * inserting all service steps, and their associated requirements.
 * OPTIMIZED: Uses bulk inserts and parallel queries to minimize database round trips.
 *
 * @param service_id - ID of the service to start
 * @param user_id - ID of the user starting the service
 * @param service_name - Optional service name (if already fetched, avoids redundant query)
 * @returns The created trip object
 * @throws Throws an error if any step of the process fails
 */
export const startService = async (
  service_id: string,
  user_id: string,
  service_name?: string,
  service_steps?: ServiceStep[]
) => {
  // 1. Fetch service name only if not provided
  let serviceName = service_name;
  if (!serviceName) {
    const { data: serviceData, error: serviceError } = await supabase
      .from("services")
      .select("name")
      .eq("id", service_id)
      .single();

    if (serviceError) {
      throw serviceError;
    }
    serviceName = serviceData.name;
  }

  // 2. Create a new trip
  const { data: tripData, error: tripError } = await supabase
    .from("trips")
    .insert({
      user_id,
      service_id,
      service_name: serviceName,
      status: "in_progress",
    })
    .select();

  if (tripError || !tripData?.[0]) {
    console.error("Failed to create trip:", tripError);
    throw tripError || new Error("Trip creation failed");
  }

  const trip = tripData[0];

  // 3. Fetch all steps for the service
  let serviceSteps = service_steps;

  if (!serviceSteps) {
    const { data: fetchedSteps, error: serviceStepsError } = await supabase
      .from("service_steps")
      .select("*")
      .eq("service_id", service_id)
      .order("step_number", { ascending: true });

    if (serviceStepsError) {
      console.error("Failed to fetch service steps:", serviceStepsError);
      throw serviceStepsError;
    }
    serviceSteps = fetchedSteps;
  }

  if (!serviceSteps || serviceSteps.length === 0) {
    throw new Error("No steps found for this service");
  }

  // 4. Bulk insert all trip steps at once
  const tripStepsToInsert = serviceSteps.map((step) => ({
    trip_id: trip.id,
    step_number: step.step_number,
    title: step.title,
    description: step.description,
  }));

  const { data: insertedTripSteps, error: tripStepsError } = await supabase
    .from("trip_steps")
    .insert(tripStepsToInsert)
    .select();

  if (tripStepsError || !insertedTripSteps) {
    console.error("Failed to insert trip steps:", tripStepsError);
    throw tripStepsError || new Error("Trip steps insertion failed");
  }

  // 5. Fetch all requirements for all service steps in a single query
  const serviceStepIds = serviceSteps.map((step) => step.id);
  const { data: allRequirements, error: requirementsError } = await supabase
    .from("service_requirements")
    .select("*")
    .in("service_steps_id", serviceStepIds);

  if (requirementsError) {
    console.error("Failed to fetch requirements:", requirementsError);
    throw requirementsError;
  }

  // 6. Bulk insert all requirements at once (if any exist)
  if (allRequirements && allRequirements.length > 0) {
    // Create a map of service_step_id to trip_step_id for quick lookup
    const stepIdMap = new Map(
      serviceSteps.map((serviceStep, index) => [
        serviceStep.id,
        insertedTripSteps[index].id,
      ])
    );

    const tripRequirementsToInsert = allRequirements.map((req) => ({
      trip_step_id: stepIdMap.get(req.service_steps_id),
      title: req.title,
      notes: req.notes,
    }));

    const { error: tripRequirementsError } = await supabase
      .from("trip_steps_requirements")
      .insert(tripRequirementsToInsert);

    if (tripRequirementsError) {
      console.error(
        "Failed to insert trip requirements:",
        tripRequirementsError
      );
      throw tripRequirementsError;
    }
  }

  // 7. Return the created trip
  return trip;
};

export const completeService = async (service_id: string) => {
  // TODO: implement complete service
};

export const cancelService = async (service_id: string) => {
  // TODO: implement cancel service
};
